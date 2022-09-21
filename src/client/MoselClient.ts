const axios = require("axios").default;
import { AxiosBasicCredentials, AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export class MoselClient {
  postMethod = "post";
  getMethod = "get";

  async requestBtOpenApi(
    method: string,
    url: string,
    data: null | object = null,
    headers: null | AxiosRequestHeaders = null,
    auth: null | AxiosBasicCredentials = null,
    timeout: number = 4000
  ): Promise<any> {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
      auth: auth,
      headers: headers,
      timeout: timeout,
    }
    return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleBtRequestError() {}
}
