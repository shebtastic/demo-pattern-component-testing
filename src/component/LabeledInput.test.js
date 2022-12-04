import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import LabeledInput from "./LabeledInput";

describe("google maps", () => {
  const pattern = "https?:\\/\\/((www\\.)?google\\.(com|fr|de)|goo.gl)\\/maps(\\?.+|\\/.+)";

  test('handles full maps link', async () => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "google maps link"
    const inputValue = "https://www.google.com/maps?q=pik+as&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjVh8fX4dr7AhVDi_0HHVB2AHEQ_AUoBHoECAIQBg";
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"url"} label={label} name={"maps-link"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(false)
  });

  test('handles goo.gl maps link', async () => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "google maps link"
    const inputValue = "https://goo.gl/maps/fQkGPLsjNVBoUdD19";
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"url"} label={label} name={"maps-link"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(false)
  });

  test('fails non-google maps link', async () => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "google maps link"
    const inputValue = "https://duckduckgo.com/?q=kittens&iax=images&ia=images";
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"url"} label={label} name={"maps-link"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(true)
  });

  test.each([
    ["http", "", "com"],
    ["https", "", "com"],
    ["http", "www.", "com"],
    ["https", "www.", "com"],
    ["http", "", "de"],
    ["https", "", "de"],
    ["http", "www.", "de"],
    ["https", "www.", "de"],
  ])('handles alternative link formats - %s with %s and %s', async (protocol, subdomain, topleveldomain ) => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "google maps link"
    const inputValue = `${protocol}://${subdomain}google.${topleveldomain}/maps?q=pik+as&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjVh8fX4dr7AhVDi_0HHVB2AHEQ_AUoBHoECAIQBg`;
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"url"} label={label} name={"maps-link"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(false)
  });
})

describe("phone number", () => {
  const pattern = "(00|+)49[0-9]{,13}";

  test.each([
    "0049040427312059",
    "+49040427312059",
  ])('correct phone number - %s', async (inputValue) => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "phone"
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"tel"} label={label} name={"phone-number"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(false)
  });

  test('to fail phone number', async () => {
    const mockFn = jest.fn((event) => event.preventDefault())
    const label = "phone"
    const inputValue = "4811234976120870"
    render(
      <form onSubmit={mockFn}>
        <LabeledInput type={"tel"} label={label} name={"phone-number"} pattern={pattern}/>
        <button>Submit</button>
      </form>
    );

    const input = screen.getByLabelText(label)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(input, inputValue)
    await userEvent.click(submitButton)

    expect(input.validity.patternMismatch).toBe(false)
  });
})
