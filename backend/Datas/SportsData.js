const SportsData = [
  {
    name: "Football",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lcp.com%2Fmedia%2Fesuky3bq%2Flcp-sports-football.jpg&f=1&nofb=1&ipt=9f3bcc1f11d16d4af77366415cb3d42a767689aaf58dfb80e9ee2682775bef28",
    description: "Book football courts anytime with ease and enjoy a perfect match.",
  },
  {
    name: "Badminton",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.LoLCEevXgzAF5cMO-hbWsQHaF0%3Fpid%3DApi&f=1&ipt=070745c497b58650368c4169b2280eb1e4b57299f80bd4513f2628f124a883e1&ipo=images",
    description: "Find badminton courts nearby and schedule your games instantly.",
  },
  {
    name: "Tennis",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.VcV3wPb8utFpwWO_6b20ewHaE7%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=c985dd0cfd1a6963a462ade82b882b2a77cecd2e3edd89008e872719eb14b749&ipo=images",
    description: "Book tennis courts for singles or doubles matches with ease.",
  },
  {
    name: "Cricket",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.vQCfPTfztdZv_hf6ufNacAHaEK%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=ffc102914ee5a255e6cd0b17b6f49ada93da833c879bc1d5c5cfa7e2d21795af&ipo=images",
    description: "Reserve cricket grounds quickly and play your favorite game.",
  },
  {
    name: "Basketball",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.-2E325lEJasn7mdcGhir6gHaE8%3Fpid%3DApi&f=1&ipt=571c75da0b53d727e5d6549e8795b9abf567ca4293c2d3aa242910ae82ee10de&ipo=images",
    description: "Find basketball courts and schedule matches with friends.",
  },
  {
    name: "Boxing",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.XzHLQwpC4inrc9qY8csn_QHaFC%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=3e6dea0b585f8e78b0b7acfc1c5b9b7a1eda3dd8e572ffaef27ea00d4b2991fc&ipo=images",
    description: "Train and book boxing rings with certified coaches.",
  },
  {
    name: "Swimming",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.GZ55KHJPyai1F5TK2HCAkwHaFE%3Fpid%3DApi%26ucfimg%3D1&f=1&ipt=736f48d1728409beb7e85aa3c9f4559c6c8da4176dd23671132cf433d35700ee&ipo=images",
    description: "Book swimming pools and improve your skills with ease.",
  },
  {
    name: "Yoga",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.8mw2Vd6fSykoZZQ7LW36IgHaE7%3Fpid%3DApi%26ucfimg%3D1&f=1&ipt=a8eccad653a818a9065fdc7f81c4ebae092d86786886ffc6313abecb93b8b488&ipo=images",
    description: "Find yoga classes and book sessions for your mind and body wellness.",
  },
  {
    name: "Gym / Fitness",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.EdZLcyEglUQB-vsDjvE-2gHaD4%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=7f97cd28157b3593116b2509f58d07b02f120b48167f96b9fb94800efc4cfb6b&ipo=images",
    description: "Book gym sessions, personal trainers, and fitness programs easily.",
  },
  {
    name: "Table Tennis",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.8Ar4fqCkVP3s2N8R8NT1ZAHaEM%3Fpid%3DApi%26ucfimg%3D1&f=1&ipt=78be0b128cb034704c1714991f0f9a2ebc823313881fc94a305c67cfdf6f970a&ipo=images",
    description: "Play table tennis with friends and book courts anytime.",
  },
  {
    name: "Volleyball",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.lxPQloMS-XN_UzuizXWoaQHaE7%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=9d7a1867a5fd2e9deb1d47746f43ee4665b047f22142650ca055dc1e93e4a1a8&ipo=images",
    description: "Book volleyball courts and enjoy matches with friends and teams.",
  },
  {
    name: "Golf",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.jnjObabhciNdtqAb-arioQAAAA%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=093e092f22527b7605272bdea9655e76a38b6977cfaed275482c2c7ccf099a7d&ipo=images",
    description: "Reserve golf courses and practice your swing anytime.",
  },
  {
    name: "Cycling",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.Zf5x1O-9W4jDOj-oBvv4-QHaE8%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=3d41360bcc7cd08fba8f69aaeb43de6dfb55a96480b9f021bdea3b0d794f4767&ipo=images",
    description: "Join cycling clubs or rent bikes for fun rides and races.",
  },
  
  {
    name: "Hockey",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.okLzCi-1aQeoTy-HAjv0gwAAAA%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=62cc29c10f0b193d138cb937ef61a4a30fa938cf011f7175948d068b9a374749&ipo=images",
    description: "Reserve hockey fields for matches and practice sessions.",
  },
  {
    name: "Martial Arts",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.BNH6UPwAK126YvLv9MI3GwHaE8%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=19293245aaaa1c06f2cc417e07739fc294b01074c7803b9bcef31315b85b7953&ipo=images",
    description: "Train in martial arts and book sessions with certified instructors.",
  },
  {
    name: "Skating",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.0FUY1njQdiZGEa4ilpDubAHaE8%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=d3633e0901a6000cd45a2bd4bacf2d94d9e64d0da1cfbae1033ba96781f727ef&ipo=images",
    description: "Find skating rinks and enjoy roller skating or ice skating sessions.",
  },
  {
    name: "Archery",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.fZmi7kd1_KdTxYHRvUH5XAHaE8%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=df410f3297fc9be8bf3563ce5a90654ed8396e7d81d366a652a08af095517dcd&ipo=images",
    description: "Book archery ranges and practice your aim with proper guidance.",
  },
  {
    name: "Rock Climbing",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.pujDjdcEyQytZYBufg0Z5wHaE8%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=09df16d9aae0c28dc66e20ce55682ec3f0f1b5400b6820ed497c6235095b69ce&ipo=images",
    description: "Book climbing walls or outdoor climbing spots for adventure.",
  },
  {
    name: "Surfing",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.jNMUt1E9JqlCrkr63kKgPgHaE8%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=d6c2f267e23ddee4a77c6b4396b599678bc26b58cf74d963cdb4a3ec20fc9a54&ipo=images",
    description: "Reserve surfing lessons and catch the waves like a pro.",
  },
];

export default SportsData;