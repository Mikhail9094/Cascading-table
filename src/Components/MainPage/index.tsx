import styles from "./main.module.scss";
import CustomLink from "../CustomLink";
import { navLinks } from "./constants";
import Table from "../Table";

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.header__icons}>
          <CustomLink img="/img/header/apps.svg" to={""} addClass={styles["animation-button"]} />
          <CustomLink img="/img/header/reply.svg" to={""} addClass={styles["animation-button"]} />
        </div>
        <div className={styles.header__buttons}>
          <CustomLink nameLink="Просмотр" to={""} addClass={styles.active} />
          <CustomLink nameLink="Управление" to={""} addClass={styles.active} />
        </div>
      </header>
      <main className={styles.main}>
        <Table />
      </main>
      <nav className={styles.nav}>
        <button className={styles.nav__button}>
          <p>
            Название проекта
            <span>Аббревиатура</span>
          </p>
          <img src="/img/nav/arrow-down.svg" />
        </button>

        {navLinks.map((item) => {
          return (
            <CustomLink
              key={item.name}
              nameLink={item.name}
              to={item.to}
              addClass={styles.nav__links}
              img={item.img}
            />
          );
        })}
      </nav>
    </div>
  );
}

export default MainPage;
