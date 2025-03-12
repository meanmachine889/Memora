// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping (uint256 => uint256) public expirationTimeStamps;
    mapping (address => uint256) public existingMembership;
    
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable(msg.sender) {}

    function mintNFT(address recipient, uint256 duration, string memory tokenURI) public onlyOwner {
        require(existingMembership[recipient] == 0 || block.timestamp > expirationTimeStamps[existingMembership[recipient]], 
            "User already has an active membership.");

        uint256 currId = nextTokenId;
        nextTokenId++;
        uint256 expirationDate = block.timestamp + (duration * 1 days);
        expirationTimeStamps[currId] = expirationDate;

        _safeMint(recipient, currId);
        _setTokenURI(currId, tokenURI);
        existingMembership[recipient] = currId;
    }

    function isMembershipActive(uint256 tokenId) public view returns (bool) {
        return block.timestamp < expirationTimeStamps[tokenId];
    }

    function memberExpiryDate(uint256 tokenId) public view returns (uint256) {
        return expirationTimeStamps[tokenId];
    }

    function transferMembership(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT.");
        require(isMembershipActive(tokenId), "Membership has expired. Cannot transfer.");
        require(existingMembership[to] == 0 || block.timestamp > expirationTimeStamps[existingMembership[to]], 
            "Receiver already has an active membership.");

        existingMembership[msg.sender] = 0;  
        existingMembership[to] = tokenId;  

        _transfer(msg.sender, to, tokenId);
    }

    function returnTokenURI(uint256 tokenId) public view returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
