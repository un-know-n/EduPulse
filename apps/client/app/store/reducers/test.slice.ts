import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Step {
  stepNumber: number;
  stepQuestion: string;
  pointsPerQuestion: number;
  isSingleAnswer: boolean;
  answers: string[];
  correctAnswer: string;
  active?: boolean;
}

export interface TestState {
  testName: string;
  steps: Step[];
  testPoints: number;
}

const initialState: TestState = {
  testName: '',
  steps: [],
  testPoints: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateTestName: (state, action: PayloadAction<string>) => {
      state.testName = action.payload;
    },
    addStep: (state, action: PayloadAction<Step>) => {
      state.steps.push(action.payload);
      state.testPoints += action.payload.pointsPerQuestion;
    },
    removeStep: (state, action: PayloadAction<number>) => {
      const removedStep = state.steps.find(
        (step) => step.stepNumber === action.payload,
      );
      if (removedStep) {
        state.testPoints -= removedStep.pointsPerQuestion;
        state.steps = state.steps.filter(
          (step) => step.stepNumber !== action.payload,
        );
      }
    },
    resetTestForm: (state) => {
      state.testName = '';
      state.steps = [];
      state.testPoints = 0;
    },
  },
});

export const { updateTestName, addStep, removeStep, resetTestForm } =
  testSlice.actions;

export default testSlice.reducer;
