import { Github, Linkedin } from "lucide-react";
import about from "../assets/images/about.svg";

const About = () => {
  return (
    <div className="grid min-h-[80vh] px-2 mx-auto w-full md:max-w-[80vw] mt-4 lg:mt-8">
      <div className="grid lg:grid-cols-2 lg:place-items-center gap-8">
        <div className=" place-self-center">
          <img src={about} alt="about" />
        </div>
        <div className="grid gap-4">
          <div>
            <h1 className="text-sm font-medium text-justify tracking-wide">
              <span className="text-primary text-lg">ShopCart</span> is a
              Full-Stack Web App developed as my Capstone Project for Upgrad -
              Knowledgehut Full-Stack Bootcamp. It is a full-stack MERN
              application built using React for front-end, MongoDB for database,
              and Express and Node for back-end.
            </h1>
          </div>
          <div className="text-sm  tracking-wide">
            <h2 className="font-medium">Front-End</h2>
            <li className="text-justify">
              uses React v18+ and is built around React Router v6.4+ framework
              along with React Query v4+ for caching. Tailwind is used heavily
              for CSS.
            </li>
            <h2 className="font-medium mt-2">Back-End</h2>
            <li>
              built on Express framework for Node. Passport-Local along with
              Argon2 is used for user authentication and password hashing.
              Mongoose is used to model and query MongoDB. Joi for Schema
              validation and Express Session for session management.
            </li>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <a
              href="https://github.com/AnandBawa/shopcart/"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 justify-center font-medium tracking-wide transition-all ease-in hover:scale-105"
            >
              <Github color="#2563eb" />
              Anand Bawa
            </a>
            <a
              href="https://www.linkedin.com/in/anandbawa/"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 justify-center font-medium tracking-wide transition-all ease-in hover:scale-105"
            >
              <Linkedin color="#2563eb" />
              Anand Bawa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
