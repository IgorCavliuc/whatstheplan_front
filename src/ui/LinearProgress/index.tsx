import { CSSProperties, forwardRef, HTMLAttributes, memo } from "react";
import classnames from "classnames";

import styles from "./style.module.scss";

export type Label =
  | false
  | "right"
  | "bottom"
  | "topFloating"
  | "bottomFloating";
export interface LinearProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: Label;
  title?: string;
  backgroundClassName?: string;
}

export const LinearProgress = memo(
  forwardRef<HTMLDivElement, LinearProgressProps>(
    (
      {
        value,
        className,
        label = "bottom",
        title,
        backgroundClassName,
        style,
        ...props
      },
      ref,
    ) => {
      return (
        <div
          className={classnames(
            className,
            styles.linearRoot,
            styles[label as keyof typeof styles],
          )}
          ref={ref}
          data-line-progress-label={label}
          data-line-progress-value={value}
          style={
            {
              "--linear-progress-width": value * 100 + "%",
              ...style,
            } as CSSProperties
          }
          {...props}
        >
          {title && <p>{title}</p>}
          <div
            className={classnames(styles.linearBackground, backgroundClassName)}
          />
          {label && (
            <p className={classnames(styles.label)}>
              {`${(value * 100).toFixed(0)}%`}
            </p>
          )}
        </div>
      );
    },
  ),
);
