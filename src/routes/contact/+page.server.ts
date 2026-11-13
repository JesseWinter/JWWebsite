import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const prerender = false;

const recipient = 'jessewinter310@gmail.com';

export const actions = {
  default: async ({ request, platform }) => {
    const data = await request.formData();
    const read = (name: string) => String(data.get(name) ?? '').trim();

    if (read('companyWebsite')) {
      return fail(400, { error: 'Unable to submit this inquiry.', values: undefined });
    }

    const values = {
      service: read('service'),
      pricing: read('pricing'),
      colorService: read('colorService'),
      name: read('name'),
      email: read('email'),
      projectName: read('projectName'),
      projectType: read('projectType'),
      timeline: read('timeline'),
      projectLink: read('projectLink'),
      details: read('details')
    };

    if (
      !['vfx', 'color'].includes(values.service) ||
      !['hourly', 'project'].includes(values.pricing) ||
      (values.service === 'color' && !['Color Grade', 'Show LUT'].includes(values.colorService)) ||
      !['Feature Film', 'Short Film', 'Commercial', 'Documentary', 'Other'].includes(values.projectType) ||
      !values.name || values.name.length > 100 ||
      !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(values.email) ||
      values.email.length > 150 ||
      !values.projectName || values.projectName.length > 120 ||
      values.timeline.length > 120 || values.projectLink.length > 250 ||
      (values.projectLink && !/^https?:\/\/\S+$/i.test(values.projectLink)) ||
      !values.details || values.details.length > 2000
    ) {
      return fail(400, {
        error: 'Check the required fields and use an HTTPS or HTTP link.',
        values
      });
    }

    const bindings = platform?.env as {
      RESEND_API_KEY?: string;
      CONTACT_FROM?: string;
    } | undefined;

    const apiKey = bindings?.RESEND_API_KEY || env.RESEND_API_KEY;
    const from = bindings?.CONTACT_FROM || env.CONTACT_FROM;
    const deliveryError =
      'Your inquiry could not be sent. Please try again or use the email link above.';

    if (!apiKey || !from) {
      return fail(503, { error: deliveryError, values });
    }

    const isVfx = values.service === 'vfx';
    const service = isVfx ? 'VFX' : 'Color Grading';
    const pricing = values.pricing === 'hourly'
      ? `Hourly (${isVfx ? '$40/hr' : '$25/hr'})`
      : 'Project rate (quote requested)';

    const message = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Service: ${service}`,
      ...(!isVfx ? [`Color service: ${values.colorService}`] : []),
      `Pricing: ${pricing}`,
      `Project: ${values.projectName}`,
      `Project type: ${values.projectType}`,
      `Timeline: ${values.timeline || 'To be discussed'}`,
      ...(values.projectLink ? [`Project link: ${values.projectLink}`] : []),
      '',
      'Project details:',
      values.details
    ].join('\n');

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from,
          to: [recipient],
          reply_to: values.email,
          subject: `${service} inquiry: ${values.projectName.replace(/[\r\n]+/g, ' ')}`,
          text: message
        })
      });

      if (!response.ok) {
        console.error('Contact email rejected by Resend:', response.status);
        return fail(502, { error: deliveryError, values });
      }
    } catch {
      console.error('Contact email request failed.');
      return fail(502, { error: deliveryError, values });
    }

    return { success: true, values: undefined };
  }
} satisfies Actions;