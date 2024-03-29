import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

export const Container = styled.div`
  ${tw`grid w-full max-w-full grid-cols-1 gap-0 overflow-visible border rounded border-beige-500 bg-beige-100`}
`;

export const BottomMessage = styled.div`
  ${tw`p-4 text-xs text-center border-0 border-t border-dashed border-beige-500`}
`;

export const Box = styled.div`
  ${tw`flex flex-col items-center justify-center h-64 p-4`}
`;

export const Input = styled.input`
  ${tw`w-full px-3 py-3 bg-white border rounded-md border-beige-500 focus:outline-none focus:border-blue-100`}
`;

export const ErrorText = styled.p`
  ${tw`mt-1 mb-2 text-xs text-primary-darker`}
`;

export const ToggleSelector = styled.div`
  ${tw`flex justify-between mb-4 overflow-hidden border rounded bg-beige-100 border-beige-500`}
`;

export const ToggleSelectorOption = styled.div`
  ${tw`flex justify-center flex-grow`}

  input[type='radio'] {
    ${tw`appearance-none`}
  }

  input[type='radio']:checked + label {
    ${tw`text-white bg-primary`}
  }

  input[type='radio']:focus + label {
    ${tw`underline`}
  }

  label {
    ${tw`block w-full py-3 text-sm font-bold text-center uppercase cursor-pointer`}
  }
`;

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'transparent' | 'default' | 'text';
}

export const Button = styled.button<ButtonProps>`
  ${({ variant }) => {
    switch (variant) {
      case 'transparent':
        return tw`font-bold text-primary`;
      case 'text':
        return tw`font-normal underline`;
      default:
        return tw`w-full px-4 py-3 font-bold text-center text-white uppercase transition-colors duration-300 rounded bg-jade hover:bg-jade-darker focus:bg-jade-darker`;
    }
  }}

  &:disabled {
    ${tw`opacity-50 cursor-not-allowed`}
  }
`;

export const Form = styled.form`
  ${tw`p-2 py-3 sm:p-4`}

  #stripe-card-element {
    ${tw`w-full px-3 py-3 bg-white border rounded-md border-beige-500 focus:outline-none focus:border-blue-100`}
  }

  button[type='submit'] {
    ${tw`mt-4`}
  }

  input + .form-control,
  .form-control + input,
  .form-control + .form-control,
  input + input {
    ${tw`mt-4`}
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  left: 2.5%;
  width: 95%;
  bottom: 7.5%;
  height: 85%;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  + label::before { // checkbox
    content: "";
    border: 3px solid #434343 !important;
    border-radius: 0.25em;
    background-color: transparent;
    display: block;
    box-sizing: border-box;
    float: left;
    width: 1.125em;
    height: 1.125em;
    position: relative;
    top: .2em;
    margin-right: 0.25em;
  }
  &:checked + label {
    ${tw`bg-blue-200`}
    &::after { // checkmark
      content: "";
      position: absolute;
      display: block;
      top: 0.67em;
      left: 1.35em;
      width: 0.5em;
      height: 1.33em;
      border-right: 0.25em solid #000 !important;
      border-bottom: 0.25em solid #000 !important;
      transform: rotate(45deg);
    }
  }
  &:focus + label {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
    z-index: 1;
  }
`;

export const CheckboxWrapper = styled.div`
  ${tw`relative`}
  label {
    ${tw`block relative w-full h-full px-3 py-3 text-center text-sm border rounded-md cursor-pointer bg-white-100 border-beige-500`}
  }
`;

export const Headline = styled.h3`
  ${tw``}
`;

export const Title = styled.div`
  ${tw`px-4 py-3 text-sm text-lg font-bold text-center uppercase border-0 border-b bg-white-100 border-beige-500`}
`;

export const Spinner = styled.div`
  .sk-cube-grid {
    width: 2.5rem;
    height: 2.5rem;
    margin: 6.25rem auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #2b2b2b;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }
`;
