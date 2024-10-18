// Navigation.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Navigation from "./Navigation";
import { AuthRepositoryImpl, UserEntity } from "@/entities/Auth/core";
import { Suspense } from "react";

const meta: Meta<typeof Navigation> = {
  title: "Widgets/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    isRSC: true,
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

// 사이드바가 닫힌 상태의 스토리
export const LoginNav = () => {
  return (
    <Suspense>
      <Navigation
        {...{
          authRepository: new (class Mock implements AuthRepositoryImpl {
            login(): Promise<void> {
              throw new Error("Method not implemented.");
            }
            logout(): Promise<void> {
              throw new Error("Method not implemented.");
            }
            getUserInfo(): Promise<UserEntity | undefined> {
              return Promise.resolve(new UserEntity({ id: "test", name: "test", email: "test", image: "test" }));
            }
          })(),
        }}
      />
    </Suspense>
  );
};
