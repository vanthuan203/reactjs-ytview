import axios from "utils/AxiosConfig";
export const postWithoutTokenFunciton = async (url:string, data:any) => {
    try {
      const res = await axios.post(url, data)
        .then(function (response) {
          return {
            data: response.data
          };
        })
        .catch(function (error) {
          console.log("fetch get function error",  error.response.data)
          if (error.response != null) {
            if (error.response.status === 401) {
              return {
                error: "token exprired"
              }
            }
            if (error.response.data && error.response.data.errors) {
              return {
                error: error.response.data.errors[0]
              }
            }
            return {
              error: "There is an exception error !"
            }
          }
          return {
            error: "There is an exception error !"
          }
        });
      return res;
    } catch (er) {
  
    }
  }


  export const getFunciton = async (url:string) => {
    try {
      //const accessToken="";
      const res = await axios.get(url)
        .then(function (response) {
          return {
            data: response.data
          };
        })
        .catch(function (error) {
          //console.log("fetch get function error",error)
          if (error.response != null && error.response.status === 401) {
            //console.log("token exprired")
            return {
              error: "token exprired"
            }
          }
          return {
            error: error.message[0]
          }
        });
      return res;
    } catch (er) {
  
    }
  }


  export const deleteFunciton = async (url:string) => {
    try {
      //const accessToken="";
      const res = await axios.delete(url)
        .then(function (response) {
          return {
            data: response.data
          };
        })
        .catch(function (error) {
          //console.log("fetch get function error",error)
          if (error.response != null && error.response.status === 401) {
            //console.log("token exprired")
            return {
              error: "token exprired"
            }
          }
          return {
            error: error.message[0]
          }
        });
      return res;
    } catch (er) {
  
    }
  }