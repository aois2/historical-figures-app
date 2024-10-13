export type Figure = {
  _id: string;
  name: string;
  name_jp: string;
  birth_date: string;
  death_date: string;
  mbti_type: string;
  biography: string;
  biography_jp: string;
  period: string;
  period_jp: string;
  region: string;
  region_jp: string;
  image_url: string;
  votes: number;
  mbti_votes: MBTIs[];
};

type MBTIs = {
  INTJ: number;
  INTP: number;
  ENTJ: number;
  ENTP: number;
  INFJ: number;
  INFP: number;
  ENFJ: number;
  ENFP: number;
  ISTJ: number;
  ISFJ: number;
  ESTJ: number;
  ESFJ: number;
  ISTP: number;
  ISFP: number;
  ESTP: number;
  ESFP: number;
};
