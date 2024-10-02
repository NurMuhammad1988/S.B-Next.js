import { FC } from "react";
import { TextProps } from "./text.props";
import styles from "./text.module.css"; //stylelar endi object bo'lib keladi

const Text: FC<TextProps> = ({ text }) => {
    //bu text string bo'lishi shart TextProps shunday dedi
    return <h1 className={styles.text}>{text}</h1>;
    // {styles.text} text.module.cssdan chaqirilgan class style
};

export default Text;
