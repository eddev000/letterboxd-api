const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');


router.get('/film', (req, res) => {

    let filmName = req.query.name
    let title = filmName.replace(/ /g, "-").toLowerCase()

    axios.get(`https://letterboxd.com/film/${title}`)
    .then(data => {
        let info = []
        let bgs = []
        const $ = cheerio.load(data.data)
        let bg = $('.backdrop-container', data.data).each(function() {
            let backdrop = $(this).find('#backdrop').attr('data-backdrop')
            bgs.push({
                image_bg : backdrop
            })
        })
        let popularList = $('#content', data.data).each(function() {
            let title = $(this).find('#featured-film-header > h1').text()
            let sinopse = $(this).find('.truncate > p').text()
            let tagline = $(this).find('.tagline').text()
            let poster = $(this).find('section > div > img').attr('src')

            info.push({
                title : title,
                tagline : tagline,
                synopses: sinopse,
                poster : poster
            })
        })
        res.send({ 'info' : info, 'bgs' : bgs})
    })
    
})


module.exports = router