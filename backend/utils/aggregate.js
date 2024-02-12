module.exports = {
    previewImage: (v,nest=false,json) => v.map(idk => {
        const j = json?idk.toJSON():idk
        const obj = nest?j.Spot:j
        const firstPreview = obj.SpotImages.filter(i=>i.preview)[0]
        obj.previewImage = firstPreview?.url || 'No Preview Available'
        delete obj.SpotImages
        return j
    }),
    avgRating: (v,json) => v.map(idk => {
        const j = json?idk.toJSON():idk
        j.avgRating = j.Reviews.reduce((a,b)=>a+b.stars,0)/j.Reviews.length || 0
        delete j.Reviews
        return j
    })
}
