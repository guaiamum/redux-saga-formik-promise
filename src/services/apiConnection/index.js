const genMock = ({ name }) => ({
  teams: [
    {
      id: `${new Date().getUTCMilliseconds()}`,
      crestUrl: "https://picsum.photos/200/300",
      shortName: name.substring(0, 1),
      name
    }
  ]
});

export const apiConnection = (endpoint = "", values) => {
  return new Promise((res) => {
    const sleepTime = endpoint === "quick" ? 900 : 3000;

    const timeout = setTimeout(() => {
      console.log("done with req");
      res(genMock(values));

      clearTimeout(timeout); // not necessary, leaving here in case I change it to cancel "API request"
    }, sleepTime);
  });
};
