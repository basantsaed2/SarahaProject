export const findOne = async ({ model, filter = {}, select = "", options = {} }) => {
    const doc = model.findOne(filter)
    if (select) doc.select(select)
    if (options.populate) doc.populate(options.populate)
    return await doc
}

export const find = async ({ model, filter = {}, select = "", options = {} }) => {
    const doc = model.find(filter)
    if (select) doc.select(select)
    if (options.populate) doc.populate(options.populate)
    return await doc
}

export const createOne = async ({ model, data = {}, select = "", options = {} }) => {
    const doc = model.create(data)
    return await doc
}

export const updateOne = async ({ model, filter = {}, data = {}, select = "", options = {} }) => {
    const doc = model.findOneAndUpdate(filter, data, options)
    if (select) doc.select(select)
    if (options.populate) doc.populate(options.populate)
    return await doc
}

export const deleteOne = async ({ model, filter = {}, select = "", options = {} }) => {
    const doc = model.deleteOne(filter)
    return await doc
}