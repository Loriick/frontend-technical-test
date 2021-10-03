import { BASE_URL } from './constant';

class Http {
  private BASE_URL: string;
  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL;
  }

  public async post(
    path: string,
    body: { [k: string]: string | number | boolean }
  ) {
    const res = await fetch(`${this.BASE_URL}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return { status: res.status, data: await res.json() };
  }

  public async get(path: string) {
    const res = await fetch(`${this.BASE_URL}/${path}`);
    const data = await res.json();

    return { data, status: res.status };
  }

  public async getById(path: string, id: string | number) {
    return await this.get(`${path}/${id}`);
  }
}

export default new Http(BASE_URL);
