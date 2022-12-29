import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import './AddFriend'
import AddFriend from "./AddFriend";

test('should render', () => {
    render(<AddFriend/>)
    const addFriendElement = screen.getByTestId('af-1')
    expect(addFriendElement).toBeInTheDocument
    expect(addFriendElement).toHaveTextContent('Add a Friend')
})

test('test', () => {
    expect(true).toBe(true)
})