export const apiUrl = (state) => state.config.envUrl && state.config.envUrl.apiUrl;

export const getCustomer = (customerList, id) => {
  return customerList ? customerList.find((cust) => cust.id === id) : null;
};
