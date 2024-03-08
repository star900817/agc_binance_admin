import React, { useEffect, useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const FaqManage = () => {
  const [faqData, setFaqData] = useState([]);

  const fetchFaqData = async () => {
    try {
      let result = await axios.get(`${url}/faqs/getFaqs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (result?.data?.data[0]?.faqs.length > 0) {
        setFaqData(result.data.data[0].faqs);
      } else {
        setFaqData([]);
      }
    } catch (error) {
      console.log(error);
      setFaqData([]);
    }
  };

  const updateFaqData = async () => {
    try {
      const updatedFaq = faqData.map((faq) => {
        const newFaq = { question: faq.question, answer: faq.answer };
        return newFaq;
      });

      await axios.post(
        `${url}/faqs/addOrUpdateFaqs`,
        { faqs: updatedFaq },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      toast.success("Faq updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  const addField = () => {
    setFaqData((currentFaqData) => {
      let len = currentFaqData.length;
      if (
        len > 0 &&
        (!currentFaqData[len - 1].question || !currentFaqData[len - 1].answer)
      ) {
        return currentFaqData;
      }

      const newFaq = {
        question: "",
        answer: "",
      };

      const updatedFaqData = [...currentFaqData, newFaq];
      return updatedFaqData;
    });
  };

  const removeField = (index) => {
    setFaqData((currentFaqData) => {
      const updatedFaqData = currentFaqData.filter((faq, i) => i != index);
      return updatedFaqData;
    });
  };

  const onChangeHandler = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    setFaqData((currentFaqData) => {
      const updatedFaqData = currentFaqData.map((faq, i) => {
        if (i == index) {
          const updatedFaq = { ...faq, [name]: value };
          return updatedFaq;
        } else {
          return faq;
        }
      });
      return updatedFaqData;
    });
  };

  const onSubmitHandler = () => {
    const len = faqData.length;
    if (!faqData[len - 1].question || !faqData[len - 1].answer) {
      toast.error("Faq field cannot be empty");
    } else {
      updateFaqData();
    }
  };

  return (
    <div className="faq-container">
      <h2>FAQ</h2>
      {faqData.map(({ question, answer }, index) => {
        return (
          <div key={index} className="faq-field-container">
            <textarea
              cols="60"
              rows="5"
              placeholder="Question"
              name="question"
              value={question}
              onChange={(e) => onChangeHandler(e, index)}
            ></textarea>
            <textarea
              cols="60"
              rows="5"
              placeholder="Answer"
              name="answer"
              value={answer}
              onChange={(e) => onChangeHandler(e, index)}
            ></textarea>
            <MinusCircleOutlined
              style={{ fontSize: "16px", cursor: "pointer" }}
              onClick={() => removeField(index)}
            />
          </div>
        );
      })}

      <div className="faq-btn-container">
        <Button type="primary" onClick={addField}>
          Add Field
        </Button>

        {faqData.length > 0 && (
          <Button type="primary" onClick={onSubmitHandler}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
export default FaqManage;
