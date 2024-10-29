"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React, { ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { set } from "zod";

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements> extends MotionProps {
  type?: Tag;
  children: React.ReactNode;
  className: string;
}

export const AnimationRoot = ({ children, initial: _initial, ...rest }: ComponentProps<typeof AnimatePresence>) => {
  const [initial, setInitial] = useState(_initial ?? true);

  useEffect(() => {
    setTimeout(() => {
      setInitial(true);
    }, 2000);
  }, []);

  return (
    <AnimatePresence {...rest} initial={initial}>
      {children}
    </AnimatePresence>
  );
};

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
  type,
  children,
  className,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = type ? (motion as any)[type] : motion.div; // Using 'any' as a temporary workaround

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
