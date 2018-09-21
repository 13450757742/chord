'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import { getDateYear } from 'chord/base/common/time';
import { IAlbumItemViewProps } from 'chord/workbench/parts/common/props/albumItem';
import { handlePlayAlbum } from 'chord/workbench/parts/player/browser/action/playAlbum';
import { handleShowAlbumView } from 'chord/workbench/parts/mainView/browser/action/showAlbum';

import { showAlbumMenu } from 'chord/workbench/parts/menu/browser/action/menu';

import { AlbumIcon } from 'chord/workbench/parts/common/component/common';


/**
 * Album item view
 *
 * This view doesn't display album's songs
 *
 * props.album is given by parent component
 */
class AlbumItemView extends React.Component<IAlbumItemViewProps, object> {

    constructor(props: IAlbumItemViewProps) {
        super(props);
    }

    render() {
        let album = this.props.album;
        let cover = album.albumCoverPath || album.albumCoverUrl;

        return (
            <div>
                <div draggable={true}>
                    <div className="media-object" style={{ maxWidth: '300px' }}>
                        <div className="media-object-hoverable">
                            <div className="react-contextmenu-wrapper"
                                onContextMenu={(e) => this.props.showAlbumMenu(e, album)}>

                                <div className="cover-art shadow actionable linking cover-art--with-auto-height" aria-hidden="true"
                                    style={{ width: 'auto', height: 'auto' }}>
                                    <div onClick={() => this.props.handleShowAlbumView(album)}>
                                        {AlbumIcon}
                                        <div className="cover-art-image cover-art-image-loaded"
                                            style={{ backgroundImage: `url("${cover}")` }}>
                                        </div>
                                    </div>
                                    <button className="cover-art-playback"
                                        onClick={() => this.props.handlePlayAlbum(album)}>
                                        <svg className="icon-play" viewBox="0 0 85 100"><path fill="currentColor" d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"><title>PLAY</title></path></svg></button>
                                </div>

                            </div>

                            {/* Album Name */}
                            <div className="mo-info">
                                <div className="react-contextmenu-wrapper">
                                    <span className="mo-info-name">{album.albumName}</span>
                                </div>
                            </div>

                        </div>

                        {/* Artist Name */}
                        <div className="mo-meta ellipsis-one-line">
                            <div className="react-contextmenu-wrapper">
                                <span>{album.artistName}</span>
                            </div>
                        </div>

                        <div className="mo-meta ellipsis-one-line">
                            <div className="react-contextmenu-wrapper">
                                <span>{getDateYear(album.releaseDate)} • {album.songCount} tracks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return {
        handlePlayAlbum: album => handlePlayAlbum(album).then(act => dispatch(act)),
        handleShowAlbumView: album => handleShowAlbumView(album).then(act => dispatch(act)),
        showAlbumMenu: (e, album) => dispatch(showAlbumMenu(e, album)),
    };
}


export default connect(null, mapDispatchToProps)(AlbumItemView);
