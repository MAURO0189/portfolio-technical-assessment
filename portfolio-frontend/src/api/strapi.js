import axios from "axios";

const strapiClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: { "Content-Type": "application/json" },
});

export const getProfile = () => strapiClient.get("/profiles?populate=*");
export const getProjects = () => strapiClient.get("/project-tests?populate=*");
export const getSkills = () => strapiClient.get("/skills?populate=*");
export const getExperiences = () =>
  strapiClient.get("/experiences?populate=*&sort=start_date:desc");

export const getPageContent = (pageKey) =>
  strapiClient.get(`/page-contents?filters[page_key][$eq]=${pageKey}`);

export default strapiClient;
