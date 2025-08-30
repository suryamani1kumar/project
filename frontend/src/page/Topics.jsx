import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState(null);

  const handleCheckbox = async (catIndex, subIndex) => {
    const newTopics = [...topics];
    const updatedTopic = newTopics[catIndex].subTopics[subIndex];

    updatedTopic.status = !updatedTopic.status;

    const checkTopicsRemaining = newTopics[catIndex].subTopics.find(
      (item) => item.status === false
    );

    if (checkTopicsRemaining === undefined) {
      newTopics[catIndex].status = true;
    }

    setTopics(newTopics);

    try {
      const body = {
        category: newTopics[catIndex].category,
        topic: updatedTopic.name, // or topicId
        status: updatedTopic.status,
      };

      await axios.put(`${import.meta.env.VITE_BASE_URL}/updateData`, body);

    } catch (err) {
      console.error("Error updating:", err.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getData`);
      if (res.status === 200) {
        setTopics(res.data.data);
      }
    } catch (err) {
      console.error("error", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="accordion" id="topicsAccordion">
        {topics !== null &&
          topics.map((category, catIndex) => (
            <div className="accordion-item mb-2" key={catIndex}>
              <h2 className="accordion-header" id={`heading${catIndex}`}>
                <button
                  className="accordion-button collapsed bg-info fw-bold text-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${catIndex}`}
                >
                  {category.category}{" "}
                  {category.status ? (
                    <span className="mx-2 p-1 bg-success rounded-3">Done</span>
                  ) : (
                    <span className="mx-2 p-1 bg-danger rounded-3">
                      Pending
                    </span>
                  )}
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
                          <Link
                            to={topic.leetCodeLink}
                            className="text-primary"
                          >
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
