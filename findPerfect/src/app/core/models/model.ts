
interface IShoeType {
    id: string; 
    name: string; 
    rating: number;
};

interface IQuestionType {
    id: number | undefined;
    copy: string;
    answers: IAnswerType[];
};

interface IAnswerType {
    copy: string;
    nextQuestion: number | string;
    ratingIncrease: IRatingType;
}

interface IRatingType {
    [key: string]: any;
    cloud: number;
    cloudx: number;
    cloudflow: number;
    cloudventure: number;
    cloudsurfer: number;
    cloudventure_waterproof: number;
    cloudventure_peak: number;
    cloudflyer: number;
};

export {
    IShoeType,
    IQuestionType,
    IAnswerType,
    IRatingType
  }