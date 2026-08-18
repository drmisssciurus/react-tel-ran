export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
};

export type RequestStatus = 'loading' | 'success' | 'error';
