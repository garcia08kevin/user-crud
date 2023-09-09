import { User } from "../models/users"

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const ModelToLocalhostUser = (user) => {
    const { id, isActive, balance, firstName: first_name, lastName: last_name, gender = 'male' } = user
    return { id, isActive, balance, first_name, last_name, gender }
}