import { useState } from "react";
import { topicsData } from "../utils/data";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState(topicsData);

  const handleCheckbox = (catIndex, subIndex) => {
    const newTopics = [...topics];
    newTopics[catIndex].subTopics[subIndex].status =
      !newTopics[catIndex].subTopics[subIndex].status;
    setTopics(newTopics);
  };

  return (
    <div className="container mt-4">
      <div className="accordion" id="topicsAccordion">
        {topics.map((category, catIndex) => (
          <div className="accordion-item mb-2" key={catIndex}>
            <h2 className="accordion-header bg-info" id={`heading${catIndex}`}>
              <button
                className="accordion-button collapsed bg-info"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${catIndex}`}
              >
                {category.category} ({category.status})
              </button>
            </h2>

            <div
              id={`collapse${catIndex}`}
              className="accordion-collapse collapse bg-info-subtle"
              data-bs-parent="#topicsAccordion"
            >
              <div className="accordion-body">
                <div className="p-4">
                  <h4>Sub Topics</h4>
                  <ul className="list-unstyled text-center mb-0 row fw-bold border-bottom p-2 bg-white">
                    <li className="col-4">Name</li>
                    <li className="col-2">LeetCode Link</li>
                    <li className="col-2">YouTube Link</li>
                    <li className="col-2">Article Link</li>
                    <li className="col-1">Level</li>
                    <li className="col-1">Status</li>
                  </ul>
                  {category.subTopics.map((topic, subIndex) => (
                    <div
                      className={`row align-items-center text-center py-2 border-bottom ${
                        subIndex % 2 === 0 ? "bg-body-secondary" : "bg-white"
                      }`}
                      key={subIndex}
                    >
                      <div className="col-4 d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={topic.status}
                          onChange={() => handleCheckbox(catIndex, subIndex)}
                        />
                        {topic.name}
                      </div>
                      <div className="col-2">
                        <Link to={topic.leetCodeLink} className="text-primary">
                          Practise
                        </Link>
                      </div>
                      <div className="col-2">
                        <Link to={topic.youtubeLink} className="text-primary">
                          Watch
                        </Link>
                      </div>
                      <div className="col-2">
                        <Link to={topic.articleLink} className="text-primary">
                          Read
                        </Link>
                      </div>
                      <div className="col-1">{topic.level}</div>
                      <div className="col-1">
                        {topic.status ? "Done" : "Pending"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
