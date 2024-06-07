export interface CreateGameRequest {
  topic: string;
  number_of_questions: number;
  time_limit: number;
  number_of_players: number;
  display_name: string;
}

export interface Game {
  id: string;
  type: string;
  attributes: {
    preview_link: string;
    started: boolean;
    number_of_questions: number;
    number_of_players: number;
    topic: string;
    time_limit: number;
  };
  relationships: {
    players: {
      data: Player[];
    };
    questions: {
      data: Question[];
    };
  };
}

interface GenerateGameLinkResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      preview_link: string;
    };
  };
}

interface GameResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      display_name: string;
      answers_correct: number;
      answers_incorrect: number;
    };
  };
}


export interface GetFinalGameStatsResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      game_id: number;
      topic: string;
      num_of_questions: number;
      num_of_players: number;
      avg_correct_answers: number;
    };
    relationships: {
      players: {
        data: Player[];
      };
    };
  };
}

export interface Player {
  id: number;
  type: string;
  attributes: {
    display_name: string;
    answers_correct: number;
    answers_incorrect: number;
    questions_correct:string[];
  };
}

export interface Question {
  id: string | null;
  type: string;
  attributes: {
    topic: string;
    question_text: string;
    question_number: number;
    answer: string;
    options: string[];
  };
}

export {}