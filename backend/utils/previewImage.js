module.exports = (v,nest=false) => v.map(idk => {
    let j = idk.toJSON()
    const obj = nest?j.Spot:j
    const firstPreview = obj.SpotImages.filter(i=>i.preview)[0]
    obj.previewImage = firstPreview?.url || 'No Preview Available'
    delete obj.SpotImages
    return j
})
