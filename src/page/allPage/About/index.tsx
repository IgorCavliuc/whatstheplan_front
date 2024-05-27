import MainLoyaut from "../../../component/MainLoyaut";
import styles from "./styles.module.scss";
import { ScrollToBottom } from "../../../ui";

export const About = () => {
  const benefitArray = [
    {
      label: "Full free",
      description:
        "Эта платформа абсолютно бесплатная (пока). Чисто за идею. Для людей которые хотят найти команду мечты без обязательств.",
    },
    {
      label: "Вносить свой вклад",
      description:
        "Так как это startUp, будет круто если каждый из юзерой будет вносить свой вклад в развитие платформы. Это можно и нужно делать. Почему? Потому что крупные сервисы очень хорошо работают, но у них нет вохможность добавлять свободно фичу которая нравится юзерам.",
    },
    {
      label: "В чем разница?",
      description:
        "Может показаться что в этой платформе нет смысла и что есть другие крутые сервиси на подобии LinkedIn, Rabota.md, 999.md и тд и тп. But это узконаправленная платформа для определенного комьюнити. И не нужно долго искать и высматривать нужных тебе людей. Взаимодействие будет простым (по крайней мере должно быть)",
    },
  ];

  const renderBenefits = (
    label?: string,
    description?: string,
    index?: number,
  ) => {
    return (
      <div key={index} className={styles.render_item}>
        {index && <h1>{index}</h1>}
        {label || description ? (
          <div className={styles.render_item_content}>
            {label && <h2>{label}</h2>}
            {description && <p>{description}</p>}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <MainLoyaut>
      <div className={styles.about}>
        <h1 className={styles.about_question}>
          Что за ерунда? <span>Поясняем...</span>
        </h1>
        <h2 className={styles.about_question_description_first}>
          <span>КакойПлан?</span> - по факту, платформа, для создания классной
          команды, которая понимает тебя с{" "}
          <span className={styles.about_shot_word}>полусло.</span>
        </h2>
        <h2 className={styles.about_question_description_second}>
          У одних людей есть <span>проблема/идея</span>, а другие могут ее
          классно решить. И роль "КакойПлан?" помочь людям сотрудничать так, что
          бы всем было кайфово жить.
        </h2>
        <ScrollToBottom />
      </div>
      <div className={styles.about_other}>
        <h1 className={styles.about_benefits_main}>
          И наверное нужно пояснительную бригаду о бенефитах и фактах:
        </h1>

        {benefitArray?.map((item, index) => {
          return renderBenefits(item.label, item.description, index + 1);
        })}
      </div>
    </MainLoyaut>
  );
};
