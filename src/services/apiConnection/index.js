const mock = {
  teams: [
    {
      id: "1f",
      crestUrl: "https://picsum.photos/200/300",
      shortName: "Team 1",
      name: "This is Team 1"
    }
  ]
};

export const apiConnection = (endpoint = "") => {
  return new Promise((res) => {
    const sleepTime = endpoint === "quick" ? 900 : 3000;

    const timeout = setTimeout(() => {
      console.log("done with req");
      res(mock);

      clearTimeout(timeout); // not necessary, leaving here in case I change it to cancel "API request"
    }, sleepTime);
  });
};
