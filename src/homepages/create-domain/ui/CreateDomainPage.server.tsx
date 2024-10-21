"use client";

import { Button, Form, Input } from "@/shared/ui";

import BlogDescriptionField from "./BlogDescriptionField";
import OgImageUploadField from "./OGImageUploadField";
import { createBlogAction } from "../api/action";
import { useSelector } from "@/shared/hooks";
import { validateInput } from "../utils";

export default function CreateDomainPage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="flex flex-col w-full items-center md:w-[768px] h-max min-h-[calc(100*var(--vh)-4rem)] mx-auto p-6 bg-background text-color-text-default shadow-md rounded-lg">
      <header className="mt-5 mb-6 flex flex-col gap-0 w-full h-inherit max-w-[25rem]">
        <h1 className="heading-01 text-color-text-discovery  text-2xl font-bold mb-2">블로그 생성</h1>
        <p className="heading-03 text-color-text-accent-gray-default">서브도메인 이름과 SEO 정보를 입력하세요.</p>
      </header>
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          // createBlogAction();
        }}
        className="flex flex-col gap-4 w-full h-inherit max-w-[25rem] space-y-4"
      >
        <section className="space-y-4">
          <Form.Field name="subdomain" className="w-full space-y-3">
            <Form.Label htmlFor="subdomain">서브도메인 이름</Form.Label>
            <Form.Control asChild>
              <Input
                id="subdomain"
                className="w-full h-[2rem] text-color-text-brand"
                name="subdomain"
                defaultValue={user?.name ?? user?.email?.split("@")[0] ?? ""}
                required
              />
            </Form.Control>

            <Form.Message match={(value, formData) => validateInput(value)}>특수문자는 허용되지 않습니다.</Form.Message>
            <Form.Message className="FormMessage" match="valueMissing">
              서브도메인 이름을 입력하세요.
            </Form.Message>
          </Form.Field>

          <Form.Field name="blogTitle" className="space-y-3">
            <Form.Label htmlFor="blogTitle">
              블로그 제목 <Form.Required />
            </Form.Label>
            <Form.Control asChild>
              <Input id="blogTitle" name="blogTitle" placeholder="나의 멋진 블로그" required />
            </Form.Control>
            <Form.Message match={(value, formData) => validateInput(value)}>특수문자는 허용되지 않습니다.</Form.Message>

            <Form.Message className="FormMessage" match="valueMissing">
              블로그 제목을 입력하세요.
            </Form.Message>
          </Form.Field>

          <BlogDescriptionField />

          <Form.Field name="keywords" className="space-y-3">
            <Form.Label htmlFor="keywords">키워드 (쉼표로 구분)</Form.Label>
            <Form.Control asChild>
              <Input id="keywords" name="keywords" placeholder="블로그, 기술, 생활" />
            </Form.Control>

            <Form.Message match={(value, formData) => validateInput(value, true)}>
              특수문자는 허용되지 않습니다.
            </Form.Message>
          </Form.Field>

          <OgImageUploadField image={user?.image ?? ""} />
        </section>
        <footer className="mt-6">
          <Form.Submit asChild>
            <Button type="submit" className="w-full">
              블로그 생성
            </Button>
          </Form.Submit>
        </footer>
      </Form>
    </main>
  );
}
