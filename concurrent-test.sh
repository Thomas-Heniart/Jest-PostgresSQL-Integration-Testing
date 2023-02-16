#!/bin/bash

for i in $(seq 1 "${2:-15}"); do
  yarn "$1" &
  pids[${i}]=$!
done
for pid in ${pids[*]}; do
  wait $pid || exit 1
done
