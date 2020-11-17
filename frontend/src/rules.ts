/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  required: (value: any) => {
    if (value instanceof Array && value.length === 0) {
      return 'Required.';
    }
    return !!value || 'Required.';
  },
  length100: (value: string) => value.length <= 100 || 'Max 100 characters',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};
