import React from "react";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFilterType, setFilterValue } from "store/filter/filterSlice";
import { addData } from "store/watched/watchedSlice";
import { useGetResultsByFilterQuery } from "store/search/search.api";
import { filterValue } from "store/filter/filter.selector";
import { useDebounce } from "react-use";

const Index = () => {
  const dispatch = useDispatch();
  const value = useSelector(filterValue);
  const { data } = useGetResultsByFilterQuery(value, { skip: !value.length });

  return (
    <>
      <Title name="Suggest me" input>
        I will really appericiate it if you take time to suggest me something
        good to watch.
      </Title>

      <Catalog data={data && value.length && data.results} search />
    </>
  );
};

export default Index;
