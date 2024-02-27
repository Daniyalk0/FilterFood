import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Components/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [filtered, setfiltered] = useState(null);
  const [filterBtn, setfilterBtn] = useState("");
  const [isbtnactive, setisbtnactive] = useState(true);
  // setLoading(true);
  useEffect(() => {
    const FoodData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        setData(response.data);
        setfiltered(response.data);
        setLoading(false);
      } catch (error) {
        console.log("erorr", error);
        setError(error);
      }
    };
    FoodData();
  }, []);

  const search = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      setfiltered(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setisbtnactive(false);
    setfiltered(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setfilterBtn("all");
      setfiltered(data);
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setisbtnactive(true);
    setfiltered(filter);
    setfilterBtn(type);
  };

  const filterBtns = [
    {
      type: "all",
      name: "All",
    },
    {
      type: "dinner",
      name: "Dinner",
    },
    {
      type: "breakfast",
      name: "Breakfast",
    },
    {
      type: "lunch",
      name: "Lunch",
    },
  ];
  if (Error) return <div>this is error</div>;
  if (loading) return <div>loading</div>;

  return (
    <div>
      <MainContainer>
        <Top>
          <div className="logo">
            <img src="./public/Foody Zone.svg" alt="" />
          </div>
          <div className="search">
            <input type="text" placeholder="Search food..." onChange={search} />
          </div>
        </Top>
        <FilterContainer>
          {filterBtns.map((value) => {
            return (
              <Button
                key={value.name}
                onClick={() => filterFood(value.type)}
                isSelected={filterBtn === value.type}
                btnactive={isbtnactive === true}
              >
                {value.name}
              </Button>
            );
          })}
        </FilterContainer>
      </MainContainer>
      <SearchResult data={filtered} />
    </div>
  );
};

export default App;

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 5px;

  input {
    width: 15vw;
    height: 27px;
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    padding: 0px 4px;
    color: white;
  }
  ::placeholder {
    color: #ffffffb8;
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    gap: 10px;
    height: 150px;
    input {
      width: 100%;
    }
  }
`;
const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
`;
export const Button = styled.div`
  background-color: ${(props) =>
    props.isSelected && props.btnactive ? "#940909" : "red"};
  color: white;
  /* width: 43px; */
  width: fit-content;
  height: 31px;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #940909;
  }
`;
