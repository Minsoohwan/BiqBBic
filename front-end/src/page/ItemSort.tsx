import React from "react";
import styled from "styled-components";
import { ItemSortBox } from "../style/component/ItemSortBox";

export const ItemSort = () => {
  const sortList = [
    [
      "쌀",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016132995237725695772_353.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=cd3618fa1ef11cb11d181ffb23fdc44997a974dd",
    ],
    [
      "라면",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016134807124806806480_173.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=8496cc7654a9fafc206e4a2fb613553424ad164e",
    ],
    [
      "계란",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016140155272457700345_664.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=b9e25912184b3c78efa09aff1b31637f37aa85cd",
    ],
    [
      "두부",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016142590474990340599_23.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=2893ce5b2305d4dea23422a4867cd2dfb98b2966",
    ],
    [
      "우유",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016125442061002588100_3.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=b8c96f4c537cf57f5165ae16e753afaac5281623",
    ],
    [
      "생수",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016131491438564936856_662.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=ce985afa9c84d78b3e7f7cd289c445ecbcfcb3ba",
    ],
    [
      "닭고기",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016161616469036659903_397.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=5deec406d1a0a25d998f1a30f4bf712e29845ce1",
    ],
    [
      "돼지고기",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016163062452981799298_181.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=3b1dcf10ad35cf7558f9340d3203a15bd4654e84",
    ],
    [
      "소고기",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016164578671058041205_174.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=60f26896a88943d454e44340f670dfae3d92bec7",
    ],
    [
      "해물/생선",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016165824793812043481_858.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=ac356b0a547ac44e4c90fc72eeca160b342c3653",
    ],
    [
      "김치",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016222162149466887946_269.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=3f2e5614ddbb4c239ea1b4cfaef619eccfc1dabe",
    ],
    [
      "제철과일",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016182619405947133594_432.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=f261f62c047542801015ba227bee2516fe2afb7a",
    ],
    [
      "통조림",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016212345289132931023_246.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=c456ad10a0cdb3c7e501e011ef69436875a66f46",
    ],
    [
      "스낵",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016243832087950571895_687.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=c29cc12ced0a34cd676f1595535cf635e271291c",
    ],
    [
      "세제",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016314325077065110806_609.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=6ccd830432dfe2ec0c66aa00eed479245be07d18",
    ],
    [
      "휴지/물티슈",
      "https://simg.ssgcdn.com/trans.ssg?src=/cmpt/ctg/202209/2022092016304232012056394205_30.jpg&amp;w=68&amp;h=68&amp;edit=c&amp;t=5db3613addaf2615ca122b9888e1d3ccbc3e04b8",
    ],
  ];
  return (
    <Wrap>
      {sortList.map((val) => {
        return <ItemSortBox key={val[0]} title={val[0]} imgUrl={val[1]} />;
      })}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: left;
  flex-wrap: wrap;
  gap: 20px;
`;
