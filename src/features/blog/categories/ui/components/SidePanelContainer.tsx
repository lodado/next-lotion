"use client";

import { AnimationRoot, Motion, ScrollArea, Switch } from "@/shared/ui";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useCategoryContext } from "../SidePanelProvider";
import CollapsedPanel from "./Collapsed/CollapsedPanel";
import { cva } from "class-variance-authority";
import { useWindowResize } from "@/shared/hooks";
import { debounce } from "lodash-es";
import { NAVIGATION_HEIGHT } from "@/shared";

interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
}

const duration = 0.2;

const animationVariants = {
  open: {
    scaleX: 1,
    opacity: 1,
    zIndex: 100,
    transition: {
      scaleX: { duration, ease: "easeInOut" },
      opacity: { duration },
      zIndex: { duration },
    },
  },
  closed: {
    scaleX: 0.2,
    opacity: 0,
    zIndex: -1,
    transition: {
      scaleX: { duration, ease: "easeInOut" },
      opacity: { delay: duration },
      zIndex: { delay: duration },
    },
  },
};

const divStyles = cva("", {
  variants: {
    isOpen: {
      true: "sm:w-[12rem]",
      false: "sm:w-[3rem]",
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

const SidePanelContainer: React.FC<ScrollAreaProps> = ({ className = "", children }) => {
  const { isOpen, toggleSidePanel } = useCategoryContext();
  const [topPosition, setTopPosition] = useState(99999);
  const [init, setInit] = useState(false);

  const resizeCallback = useCallback(() => {
    if (init) return;

    if (window.innerWidth <= 550) {
      toggleSidePanel();
    }

    setTimeout(() => setTopPosition(NAVIGATION_HEIGHT), 1000);
    setInit(true);
  }, []);

  useWindowResize({ resizeCallback, debounceTime: 50 });

  return (
    <>
      <div className={divStyles({ isOpen })} role="none presentation"></div>
      <AnimationRoot initial={false}>
        {
          <Motion
            type="div"
            style={{ transformOrigin: "left", top: `${topPosition}px` }}
            className="fixed left-0 top-[64px] overflow-x-hidden overflow-y-auto bottom-0 w-screen sm:w-[12rem] max-h-screen px-[0.75rem] pt-[1rem]  bg-background border-t border-r border-color-border-input"
            variants={animationVariants}
            animate={isOpen ? "open" : "closed"}
          >
            <>{isOpen && children}</>
          </Motion>
        }
      </AnimationRoot>
      <div className="hidden sm:flex sm:fixed overflow-x-hidden overflow-y-auto left-0 w-[3rem] px-[0.75rem] pt-[2rem] flex-col border-t items-center bg-background border-r border-color-border-input h-full">
        <CollapsedPanel />
      </div>
    </>
  );
};

export default SidePanelContainer;
