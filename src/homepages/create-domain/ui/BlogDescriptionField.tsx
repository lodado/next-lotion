"use client";

import { Form, TextArea } from "@/shared/ui";
import React, { useState, useEffect } from "react";
import { validateInput } from "../utils/validateInput";

const translateToEnglish = async (text: string): Promise<string> => {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "ko",
      target: "en",
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.translatedText;
};

export default function BlogDescriptionField() {
  return (
    <>
      <Form.Field name="blogDescription" className="flex items-start w-full flex-col space-y-2">
        <Form.Label htmlFor="blogDescription">블로그 설명 (OG 설명으로도 사용됨)</Form.Label>
        <Form.Control asChild>
          <TextArea
            id="blogDescription"
            name="blogDescription"
            className="w-full mih-h-[6rem]"
            placeholder="이 블로그는..."
            required
          />
        </Form.Control>

        <Form.Message className="text-start" match={(value, formData) => validateInput(value)}>
          특수문자는 허용되지 않습니다.
        </Form.Message>

        <Form.Message className="FormMessage" match="valueMissing">
          블로그 제목을 입력하세요.
        </Form.Message>
      </Form.Field>
    </>
  );
}
