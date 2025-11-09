export type ProjectSlide = {
  title?: string;                 // keep optional so old data works
  image: string;
  siteLink: string;
  techStack: string | string[];   // allow both
  description: string;
  review?: string;
};
