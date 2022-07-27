export class MoselClient {
  postMethod = "post";
  getMethod = "get";

  axios = require("axios");

  async requestBtOpenApi(
    method: string,
    url: string,
    data: null | object = null,
    headers: null | object = null,
    auth: null | object = null,
    timeout: number = 4000
  ): Promise<any> {
    return this.axios({
      method: method,
      url: url,
      data: data,
      auth: auth,
      headers: headers,
      timeout: timeout,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleBtRequestError() {}
}
