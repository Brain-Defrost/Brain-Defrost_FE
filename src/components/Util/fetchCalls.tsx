import type { CreateGameRequest } from "./interfaces";

const getGame = async (gameID: string) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}`
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get game - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - game", error);
    throw error;
  }
};
const getPlayer = async () => {
  try {
    const response = await fetch(
      "https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players/1"
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get player - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - get player", error);
    throw error;
  }
};
const getStats = async (gameID: string) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/stats`
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get stats - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - stats", error);
    throw error;
  }
};

const postPlayer = async (gameID: string | undefined, displayName: string) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/players`,
      {
        method: "POST",
        body: JSON.stringify({
          display_name: displayName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      const error = status === 403 ? `Max players reached` : `Couldn't create player - ${status}`
      throw new Error(error);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - create player", error);
    throw error;
  }
};
const postGame = async (formData: CreateGameRequest) => {
  try {
    const response = await fetch(
      "https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      const error = status.toString().split('')[0] === '5' ? `Server unavailable - please try again later` : `Couldn't create game - ${status}`

      throw new Error(error);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - create game", error);
    throw error;
  }
};
const patchPlayer = async (gameID: string, playerID: string, questionNum: number) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/players/${playerID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          question: questionNum,
          correct: true
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't update player - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - patch player", error);
    throw error;
  }
};

const getAllPlayers = async (gameID: string | undefined) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/players`,
      { method: "GET" }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get players - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - get players", error);
    throw error;
  }
};

const getFinalStats = async (gameID: string | undefined) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/stats`,
      { method: "GET" }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get stats ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - get final stats", error);
    throw error;
  }
};

const patchGame = async (gameID: string | undefined) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          started: true
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't start game - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - patch game", error);
    throw error;
  }
};

const postEmail = async (gameID: string | undefined, email: string | undefined) => {
  try {
    const response = await fetch(
      `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/stats/email`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't send email - ${status}`);
    }
  } catch (error: unknown) {
    console.log("API CALLS catch block - email stats", error);
    throw error;
  }
};
export {
  getGame,
  getPlayer,
  getStats,
  postPlayer,
  postGame,
  patchPlayer,
  getAllPlayers,
  getFinalStats,
  patchGame,
  postEmail
};
