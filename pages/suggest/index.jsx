import React from "react";
import { useSelector } from "react-redux";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import { useGetResultsByFilterQuery } from "@store/search/search.api";
import { filterValue } from "@store/filter/filter.selector";
import useRouterChanged from "@hooks/useRouterChanged";

const Index = () => {
  const value = useSelector(filterValue);
  const { data } = useGetResultsByFilterQuery(value, {
    skip: !value.length,
    refetchOnMountOrArgChange: true,
  });
  useRouterChanged({ removeValue: true });

  return (
    <>
      <Title name="Suggest me" input>
        I will really appericiate it if you take time to suggest me something
        good to watch.
      </Title>

      {data && value.length > 0 && <Catalog data={data.results} search />}
    </>
  );
};

export default Index;
