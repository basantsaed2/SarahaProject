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

export const findById = async ({ model, id, select = "" }) => {
    const doc = model.findById(id)
    if (select) doc.select(select)
    return await doc
}

export const createOne = async ({ model, data = {} }) => {
    const doc = model.create(data)
    return await doc
}

export const updateOne = async ({ model, filter = {}, update = {}, select = "", options = {} }) => {
    const doc = model.findOneAndUpdate(filter, update, options)
    if (select) doc.select(select)
    if (options.populate) doc.populate(options.populate)
    return await doc
}

export const deleteOne = async ({ model, filter = {} }) => {
    const doc = model.findOneAndDelete(filter)
    return await doc
}