import React, { useEffect, useRef, useReducer } from "react";
import { generateSymbols } from "../../utils/generateSymbols";
import { getReward } from "../../utils/getReward";
import styled from "styled-components";
import ConfettiExplosion from "react-confetti-explosion";
import { SpinButton } from "../SpinButton";
import { SpinWheel } from "../SpinWheel";

const Content = styled.div`
  background-color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 3px 3px 20px #616363;
`;

const SlotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  border-radius: 20px;
  background-color: white;
  animation-iteration-count: 0;
`;

const SlotItem = styled.div`
  height: 100px;
  width: 100px;
  border: 3px solid black;
  border-radius: 12px;
  font-size: 64px;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  height: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
`;

const Remaining = styled.div`
  font-weight: 700;
`;

const CONFETTI_DURATION = 2000;

enum ActionType {
  REWARD = "REWARD",
  SPIN = "SPIN",
  CONFETTI = "CONFETTI",
}

type ReducerState = {
  symbols: string[][];
  credits: number;
  confetti: boolean;
  spinning: boolean;
};

type Action = {
  type: ActionType;
};

function reducer(state: ReducerState, action: Action) {
  if (action.type === ActionType.REWARD) {
    const reward = getReward(state.symbols);

    return {
      symbols: generateSymbols(
        state.symbols[0][state.symbols[0].length - 1],
        state.symbols[1][state.symbols[1].length - 1],
        state.symbols[2][state.symbols[2].length - 1]
      ),
      credits: state.credits + reward,
      confetti: reward > 0 ? true : false,
      spinning: false,
    };
  } else if (action.type === ActionType.SPIN) {
    return {
      ...state,
      spinning: true,
      credits: state.credits - 10,
    };
  } else if (action.type === ActionType.CONFETTI) {
    return {
      ...state,
      confetti: false,
    };
  } else {
    return {
      ...state,
    };
  }
}

export function SlotMachine() {
  const [state, dispatch] = useReducer(reducer, {
    symbols: generateSymbols(),
    credits: 100,
    spinning: false,
    confetti: false,
  });
  const slotItemRef = useRef<HTMLDivElement>(null);

  const { symbols, credits, spinning, confetti } = state;

  useEffect(() => {
    function handleAnimationEnd() {
      dispatch({
        type: ActionType.REWARD,
      });
    }

    if (slotItemRef.current) {
      slotItemRef.current.addEventListener("animationend", handleAnimationEnd);
    }

    return () => window.removeEventListener("animationend", handleAnimationEnd);
  }, [slotItemRef]);

  useEffect(() => {
    setTimeout(
      () => dispatch({ type: ActionType.CONFETTI }),
      CONFETTI_DURATION
    );
  }, [confetti]);

  function handleSpin() {
    dispatch({ type: ActionType.SPIN });
  }

  return (
    <>
      {confetti && <ConfettiExplosion duration={CONFETTI_DURATION} />}

      <Content>
        <InfoContainer>
          <TextContainer>
            <div>Credits:</div>
            &nbsp;
            <Remaining>{` ${credits}`}</Remaining>
          </TextContainer>
        </InfoContainer>

        <SlotContainer>
          <SlotItem>
            <SpinWheel
              spinning={spinning}
              symbols={symbols[0]}
              forwardedRef={slotItemRef}
            />
          </SlotItem>
          <SlotItem>
            <SpinWheel spinning={spinning} symbols={symbols[1]} />
          </SlotItem>
          <SlotItem>
            <SpinWheel spinning={spinning} symbols={symbols[2]} />
          </SlotItem>
        </SlotContainer>

        <SpinButton
          handleSpin={handleSpin}
          spinning={spinning || credits < 10}
          title="SPIN"
        />
      </Content>
    </>
  );
}
