"use client";

const Page = ({ params }: { params: { subDomain: string } }) => {
  const domain = decodeURIComponent(params.subDomain);

  return (
    <div>
      <div>{domain} 121 i18n Test </div>
    </div>
  );
};

export default Page;
