import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { textVariant } from "../utils/motion";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
//import { experiences } from "../constants";

const ExperienceCard = ({ experience }) => {
  const firebase = useFirebase();
  const [url, setURL] = useState(null);

  //get images from firebase storage
  useEffect(() => {
    firebase.getImageURL(experience.icon).then((url) => setURL(url));
  });

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {url && (
            <img
              src={url}
              alt={experience.company_name}
              className="w-[80%] h-[80%] object-contain"
            />
          )}
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const firebase = useFirebase();
  const [fireData, setFireData] = useState([]);

  //this hook helps to get all the data from firestore
  useEffect(() => {
    firebase
      .listAllData()
      .then((fireData) =>
        setFireData(fireData.docs.map((doc) => ({ ...doc.data() })))
      );
  }, []);

  //console.log(fireData);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>WHAT EDUCATION DO I HAVE</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {fireData.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
