// IM-2020-116 BM Zahri Affa
export const initialState = {
  currentValue: "0",
  fullCalculation: "",
  operator: null,
  previousValue: null,
  result: null, // To store the running total
};

const handleNumber = (value, state) => {
  const { currentValue, fullCalculation } = state;

  const updatedValue = currentValue === "0" ? `${value}` : `${currentValue}${value}`;
  const updatedCalculation =
    fullCalculation === "0" || fullCalculation === "" ? `${value}` : `${fullCalculation}${value}`;

  return {
    ...state,
    currentValue: updatedValue,
    fullCalculation: updatedCalculation,
  };
};

const handleOperator = (value, state) => {
  const { currentValue, operator, result, previousValue } = state;

  let updatedResult = result;

  if (operator && previousValue !== null) {
    updatedResult = calculateResult(previousValue, currentValue, operator);
  } else if (result === null) {
    updatedResult = parseFloat(currentValue);
  }

  return {
    ...state,
    operator: value,
    previousValue: updatedResult,
    currentValue: "0",
    fullCalculation: `${state.fullCalculation.trimEnd()} ${value} `,
    result: updatedResult,
  };
};

const handleEqual = (state) => {
  const { currentValue, operator, previousValue } = state;

  if (!operator) return state;

  const result = calculateResult(previousValue, currentValue, operator);

  return {
    currentValue: `${result}`,
    fullCalculation: `${state.fullCalculation.trim()} =`,
    operator: null,
    previousValue: null,
    result: null,
  };
};

const handleSquareRoot = (state) => {
  const { currentValue, fullCalculation } = state;

  const current = parseFloat(currentValue);

  if (current < 0) {
    return state; // Square root of negative numbers is invalid.
  }

  const result = Math.sqrt(current);

  return {
    ...state,
    currentValue: `${result}`,
    fullCalculation: `${fullCalculation.trim()} √(${currentValue})`,
  };
};

const handleDecimal = (state) => {
  const { currentValue } = state;

  if (currentValue.includes(".")) return state;

  return {
    ...state,
    currentValue: `${currentValue}.`,
    fullCalculation: `${state.fullCalculation}.`,
  };
};

const handlePercent = (state) => {
  const { currentValue } = state;

  const current = parseFloat(currentValue);

  return {
    ...state,
    currentValue: `${current / 100}`,
    fullCalculation: `${state.fullCalculation} %`,
  };
};

const handlePosNeg = (state) => {
  const { currentValue } = state;

  const current = parseFloat(currentValue);

  return {
    ...state,
    currentValue: `${current * -1}`,
  };
};

const calculateResult = (prev, current, operator) => {
  const prevValue = parseFloat(prev);
  const currentValue = parseFloat(current);

  switch (operator) {
    case "+":
      return prevValue + currentValue;
    case "-":
      return prevValue - currentValue;
    case "*":
      return prevValue * currentValue;
    case "/":
      return prevValue / currentValue;
    default:
      return currentValue;
  }
};

export const handleBackspace = (state) => {
  const { currentValue, fullCalculation } = state;

  const updatedCurrentValue =
    currentValue.length > 1 ? currentValue.slice(0, -1) : "0";

  const updatedFullCalculation =
    fullCalculation.trimEnd().length > 1
      ? fullCalculation.trimEnd().slice(0, -1)
      : "0";

  return {
    ...state,
    currentValue: updatedCurrentValue,
    fullCalculation: updatedFullCalculation,
  };
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      return handleOperator(value, state);
    case "equal":
      return handleEqual(state);
    case "decimal":
      return handleDecimal(state);
    case "percent":
      return handlePercent(state);
    case "posneg":
      return handlePosNeg(state);
    case "squareRoot":
      return handleSquareRoot(state);
    case "clear":
      return initialState;
    case "backspace":
      return handleBackspace(state);
    default:
      return state;
  }
};

export default calculator;
