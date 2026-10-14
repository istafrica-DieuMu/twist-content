#!/bin/sh
# Waits for the de-core downloaders to exit, then runs chunk 03 (DaZ) as 3 downloaders at 0.3 s.
cd /Users/diemu/ist/b2c/rnd/anton
while :; do alive=0; for p in $(cat tools/lists/1f/shards/pids); do ps -p $p >/dev/null 2>&1 && alive=1; done; [ $alive = 0 ] && break; sleep 5; done
[ -e tools/STOP ] && { echo "STOP present, DaZ not started"; exit 0; }
cp -p tools/lists/1f/shards/manifest.json tools/lists/1f/shards/manifest-de-core.json
cp -p tools/lists/1f/shards/pids tools/lists/1f/shards/pids-de-core
node -e '
const fs=require("fs");const L=fs.readFileSync("tools/lists/1f/03-de-deu.txt","utf8").split("\n").filter(Boolean).filter(l=>!fs.existsSync("api/"+l.split(" ")[0]+".json"));
const out=[[],[],[]];L.forEach((l,i)=>out[i%3].push(l));out.forEach((a,i)=>fs.writeFileSync(`tools/lists/1f/shards/de-daz-${i+1}.txt`,a.join("\n")+"\n"));
fs.writeFileSync("tools/lists/1f/shards/manifest.json",JSON.stringify({name:"de-daz",chunks:["03-de-deu.txt"],shards:["de-daz-1","de-daz-2","de-daz-3"],delay:0.3,started:new Date().toISOString()},null,1));
console.log("DaZ files left",L.length);'
: > tools/lists/1f/shards/pids
for i in 1 2 3; do nohup node tools/fetch.mjs levels tools/lists/1f/shards/de-daz-$i.txt --delay 0.3 > tools/lists/1f/shards/de-daz-$i.run.log 2>&1 & echo $! >> tools/lists/1f/shards/pids; done
echo "DaZ started $(date)"
